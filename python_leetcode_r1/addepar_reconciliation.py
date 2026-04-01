from dataclasses import dataclass
from decimal import Decimal, getcontext
from collections import defaultdict
from typing import Dict, List, Tuple, Set

# Set decimal precision globally (typical finance default)
getcontext().prec = 28


# ---------- Domain Types ----------

Symbol = str
Currency = str


@dataclass(frozen=True)
class Money:
    currency: Currency
    amount: Decimal

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.currency, self.amount + other.amount)

    def __sub__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.currency, self.amount - other.amount)


# ---------- Parsing Helpers ----------

def parse_positions(records: List[str]) -> Dict[Symbol, int]:
    """
    Parses equity positions (non-cash).
    Example record: 'AAPL 100'
    """
    positions: Dict[Symbol, int] = {}

    for record in records:
        symbol, qty = record.split()
        if symbol == "Cash":
            continue
        positions[symbol] = int(qty)

    return positions


def parse_cash(records: List[str]) -> Dict[Currency, Decimal]:
    """
    Parses cash positions.
    Assumes 'Cash <amount>' implies USD unless extended.
    """
    cash: Dict[Currency, Decimal] = defaultdict(lambda: Decimal("0"))

    for record in records:
        symbol, qty = record.split()
        if symbol == "Cash":
            cash["USD"] += Decimal(qty)

    return cash


# ---------- Core Reconciliation Logic ----------

def reconcile_positions(
    d0_pos: List[str],
    d1_trn: List[str],
    d1_pos: List[str],
) -> List[str]:
    # ---- Day 0 expected positions ----
    expected_positions: Dict[Symbol, int] = parse_positions(d0_pos)
    expected_cash: Dict[Currency, Decimal] = parse_cash(d0_pos)

    # Ensure defaults
    expected_positions = defaultdict(int, expected_positions)
    expected_cash = defaultdict(lambda: Decimal("0"), expected_cash)

    # ---- Apply Day 1 transactions ----
    for record in d1_trn:
        parts = record.split()
        symbol: Symbol = parts[0]
        txn_type: str = parts[1]
        units: int = int(parts[2])
        value: Decimal = Decimal(parts[3])
        currency: Currency = "USD"  # assumed per problem statement

        if txn_type == "BY":
            expected_positions[symbol] += units
            expected_cash[currency] -= value
        elif txn_type == "SL":
            expected_positions[symbol] -= units
            expected_cash[currency] += value
        else:
            raise ValueError(f"Unsupported transaction type: {txn_type}")

    # ---- Actual Day 1 positions ----
    actual_positions: Dict[Symbol, int] = parse_positions(d1_pos)
    actual_cash: Dict[Currency, Decimal] = parse_cash(d1_pos)

    actual_positions = defaultdict(int, actual_positions)
    actual_cash = defaultdict(lambda: Decimal("0"), actual_cash)

    # ---- Reconciliation ----
    results: List[str] = []

    # Reconcile equities
    all_symbols: Set[Symbol] = set(expected_positions) | set(actual_positions)

    for symbol in all_symbols:
        diff = actual_positions[symbol] - expected_positions[symbol]
        if diff != 0:
            results.append(f"{symbol} {diff}")

    # Reconcile cash per currency
    all_currencies: Set[Currency] = set(expected_cash) | set(actual_cash)

    for currency in all_currencies:
        diff = actual_cash[currency] - expected_cash[currency]
        if diff != 0:
            results.append(f"Cash[{currency}] {diff}")

    return results
