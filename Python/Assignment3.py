# QUESTION 1: Sliding Window Anomaly Score

import heapq
import math
from collections import defaultdict

def solve_anomaly_scores(arr, k):
   
    low_heap = []   
    high_heap = []  
    invalid = defaultdict(int) 

    def add_num(num):
        if not low_heap or num <= -low_heap[0]:
            heapq.heappush(low_heap, -num)
        else:
            heapq.heappush(high_heap, num)
        balance()

    def remove_num(num):
        invalid[num] += 1
        if num <= -low_heap[0]:
            heapq.heappush(low_heap, -heapq.heappop(low_heap)) 
        balance()

    def balance():
        while low_heap and invalid[-low_heap[0]] > 0:
            invalid[-heapq.heappop(low_heap)] -= 1
        while high_heap and invalid[high_heap[0]] > 0:
            invalid[heapq.heappop(high_heap)] -= 1
      
        if len(low_heap) > len(high_heap) + 1:
            heapq.heappush(high_heap, -heapq.heappop(low_heap))
        elif len(high_heap) > len(low_heap):
            heapq.heappush(low_heap, -heapq.heappop(high_heap))

    def get_median():
        while low_heap and invalid[-low_heap[0]] > 0:
            invalid[-heapq.heappop(low_heap)] -= 1
        while high_heap and invalid[high_heap[0]] > 0:
            invalid[heapq.heappop(high_heap)] -= 1
            
        if k % 2 == 1:
            return -low_heap[0]
        else:
            return (-low_heap[0] + high_heap[0]) / 2.0

    for i in range(k):
        add_num(arr[i])

    results = []
    for i in range(k, len(arr)):
        median = get_median()
        score = abs(arr[i] - median)
        results.append(score)
        remove_num(arr[i-k])
        add_num(arr[i])
        
    return results


# QUESTION 2: Top-K Correlated Feature Pairs

def solve_top_k_correlations(data, k):
    n_features = len(data[0])
    features = list(zip(*data)) 
    
    stats = []
    for col in features:
        mu = sum(col) / len(col)
        centered = [x - mu for x in col]
        denom = math.sqrt(sum(c**2 for c in centered))
        stats.append({'centered': centered, 'denom': denom})

    top_k_heap = [] 

    for i in range(n_features):
        for j in range(i + 1, n_features):
            fi, fj = stats[i], stats[j]
            if fi['denom'] == 0 or fj['denom'] == 0:
                corr = 0
            else:
                num = sum(a * b for a, b in zip(fi['centered'], fj['centered']))
                corr = num / (fi['denom'] * fj['denom'])
            
            entry = (abs(corr), i, j, corr)
            
            if len(top_k_heap) < k:
                heapq.heappush(top_k_heap, entry)
            elif abs(corr) > top_k_heap[0][0]:
                heapq.heappushpop(top_k_heap, entry)

    sorted_res = sorted(top_k_heap, key=lambda x: x[0], reverse=True)
    return [(item[1], item[2], item[3]) for item in sorted_res]

if __name__ == "__main__":
    print("\n--- PROGRAM START ---")

    print("\n[Question 1: Sliding Window Anomaly]")
    try:
        k_val = int(input("Enter window size k: "))
        arr_input = input("Enter array elements separated by space: ")
        arr = list(map(int, arr_input.split()))
        
        q1_ans = solve_anomaly_scores(arr, k_val)
        print("Anomaly Scores:", q1_ans)
    except ValueError:
        print("Invalid input. Please enter integers.")

    print("\n[Question 2: Top-K Correlations]")
    try:
        rows = int(input("Enter number of rows (observations): "))
        k_corr = int(input("Enter k (how many top pairs): "))
        
        print("Enter the matrix row by row (space separated numbers):")
        data_matrix = []
        for r in range(rows):
            row_str = input(f"Row {r+1}: ")
            data_matrix.append(list(map(float, row_str.split())))
            
        q2_ans = solve_top_k_correlations(data_matrix, k_corr)
        print("Top Correlated Pairs [(idx1, idx2, correlation), ...]:")
        print(q2_ans)
    except ValueError:
        print("Invalid input. Please enter numbers.")