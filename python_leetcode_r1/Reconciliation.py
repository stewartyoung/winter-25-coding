from dataclasses import dataclass
from decimal import Decimal
from typing import List, Dict
from enum import Enum

"""
Dividends → new transaction type affecting cash only

Stock splits → transaction adjusting units without cash

Multi-currency → key cash by (Cash, USD)
"""
class TransactionType(Enum):
    BY = "BY"
    SL = "SL"

CASH: str = "Cash"

@dataclass(frozen=True)
class Transaction:
    instrument: str
    transaction_type: TransactionType
    units: int
    cost: Decimal

@dataclass(frozen=True)
class Position:
    instrument: str
    units: Decimal

class Reconciliation:
    def reconcile(
        self,
        day_zero_positions: List[str], 
        day_one_transactions: List[str], 
        day_one_positions: List[str]) -> List[Position]:

        parsed_day_zero_positions = self._parse_positions(day_zero_positions)
        parsed_day_one_transactions = self._parse_transactions(day_one_transactions)
        parsed_day_one_positions = self._parse_positions(day_one_positions)

        # reconciliation can be of type position
        reconciliation_errors = self._reconcile_positions(
            parsed_day_zero_positions,
            parsed_day_one_transactions,
            parsed_day_one_positions
        )
        return reconciliation_errors
    
    def _reconcile_positions(
        self,
        day_zero_positions: List[Position], 
        day_one_transactions: List[Transaction], 
        day_one_positions: List[Position]
    ) -> List[Position]:
        # use dict
        expected = {pos.instrument : pos.units for pos in day_zero_positions}

        # 1. build expected
        print(f"day_zero_pos: {day_zero_positions}")
        for t in day_one_transactions:
            # when we buy and sell we need to update cash
            if t.transaction_type == TransactionType.BY:
                expected[t.instrument] = expected.get(t.instrument, Decimal(0)) + t.units
                if CASH in expected:
                    expected[CASH] -= t.cost
                else:
                    expected[CASH] = -t.cost
            elif t.transaction_type == TransactionType.SL:
                expected[t.instrument] = expected.get(t.instrument, Decimal(0)) - t.units
                if CASH in expected:
                    expected[CASH] += t.cost
                else:
                    expected[CASH] = +t.cost
        

        # 2. compare with actual
        actual = {p.instrument : p.units for p in day_one_positions}

        print(f"expected: {expected}")
        print(f"actual: {actual}")

        # 3. compare two dicts
        diffs = self._position_differences(expected, actual)

        return [f"{instrument} {units}" for instrument, units in diffs.items()]
            
    def _position_differences(self, expected: Dict[str, Decimal], actual: Dict[str, Decimal]) -> Dict[str, Decimal]:
        diff = {}

        instruments = set(expected.keys()) | set(actual.keys())

        for i in instruments:
            rec_diff = actual.get(i, Decimal(0)) - expected.get(i, Decimal(0))
            if rec_diff != 0:
                diff[i] = rec_diff
        
        return diff

    def _parse_positions(self, positions: List[str]) -> List[Position]:
        parsed = []
        
        for p in positions:
            parts = p.split(" ")

            instrument = parts[0]
            units = Decimal(parts[1])

            parsed.append(Position(instrument, units))
        
        return parsed

    def _parse_transactions(self, transactions: List[str]) -> List[Transaction]:
        parsed = []
        
        for t in transactions:
            parts = t.split(" ")
            
            instrument = parts[0]
            # in prod handle not valid transaction_type appropriately
            transaction_type = TransactionType(parts[1])
            units = int(parts[2])
            cost = Decimal(parts[3])

            parsed.append(Transaction(instrument, transaction_type, units, cost))

        return parsed

d0_pos = ["AAPL 100","GOOG 200","MSFT 300","Cash 10"]
d1_trn = ["AAPL SL 50 30000","GOOG BY 10 10000","GOOG SL 5 5000","NFLX BY 1 1000"]
d1_pos = ["AAPL 50","GOOG 220","AMZN 400","Cash 24000"]
expected_reconciliation = ["GOOG 15", "MSFT 300", "NFLX 1", "AMZN 400", "Cash -10"]

print(Reconciliation().reconcile(day_zero_positions=d0_pos,day_one_transactions=d1_trn, day_one_positions=d1_pos))