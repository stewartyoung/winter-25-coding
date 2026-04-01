from typing import List, Dict
from collections import defaultdict
from dataclasses import dataclass

class Solution:
    def invalidTransactionsFirstAttempt(self, transactions: List[str]) -> List[str]:
        invalid: List[str] = []

        transacts_name_to_city: Dict[str, set[str]] = {}
        transacts_namecity_to_time: Dict[str, set[int]] = {}
        
        # (name,time,amount,city)

        # first pass to build dicts
        for t in transactions:
            name,time,amount,city = t.split(",")
            transacts_name_to_city.setdefault(name, set()).add(city)
            transacts_namecity_to_time.setdefault(name + "," + city, set()).add(time)

        for t in transactions:
            is_appended = False
            print(f"t: {t}")
            # 1. amount > 1000
            name,time,amount,city = t.split(",")
            if int(amount) > 1000:
                invalid.append(t)
                continue

            
            # 2. name,city amount - latest_transact_namecity 
            
            # 2.1 same name and different city but greater than 60

            # 2.2. same name and different city but less than or equal to 60

            past_cities = transacts_name_to_city.get(name, [])
            print(f"past_cities: {past_cities}")
            for past_city in past_cities:
                past_times = transacts_namecity_to_time.get(name + "," + past_city, [])
                print(f"past_times: {past_times}")
                for past_time in past_times:
                    if abs(int(past_time) - int(time)) <= 60 and (past_time != time and past_city != city):
                        invalid.append(t)
                        is_appended = True
                        break
                if is_appended:
                    break
        
        return invalid

    def invalidTransactions(self, transactions: List[str]) -> List[str]:

        @dataclass
        class Transaction:
            name: str
            time: int
            amount: int
            city: str
            raw: str
            index: int  # preserve original position for duplicates

        # Step 1: Parse all transactions into Transaction objects
        txns: List[Transaction] = []
        for idx, t in enumerate(transactions):
            name, time, amount, city = t.split(",")
            txns.append(Transaction(name, int(time), int(amount), city, t, idx))

        n = len(txns)
        # Step 2: Boolean array to mark invalid transactions (preserves duplicates)
        invalid_flags: List[bool] = [False] * n

        # Step 3: Immediate invalid transactions (amount > 1000)
        for i, tx in enumerate(txns):
            if tx.amount > 1000:
                invalid_flags[i] = True

        # Step 4: Group transactions by name for efficient checking
        name_to_txns: defaultdict[str, List[tuple[int, str, int]]] = defaultdict(list)
        for i, tx in enumerate(txns):
            name_to_txns[tx.name].append((tx.time, tx.city, i))

        # Step 5: For each name, sort by time and check different city transactions within 60 minutes
        for name, lst in name_to_txns.items():
            lst.sort()  # sort by time
            k = len(lst)
            for i in range(k):
                time_i, city_i, idx_i = lst[i]
                for j in range(i + 1, k):
                    time_j, city_j, idx_j = lst[j]
                    if time_j - time_i > 60:
                        break  # further transactions are too far in time
                    if city_i != city_j:
                        invalid_flags[idx_i] = True
                        invalid_flags[idx_j] = True

        # Step 6: Collect results in original order, preserving duplicates
        result: List[str] = [txns[i].raw for i in range(n) if invalid_flags[i]]
        return result
