
#Problem1
def get_top_transactions(transactions):
    freq_map = {}
    for amount in transactions:
        if amount in freq_map:
         freq_map[amount] += 1
        else:
         freq_map[amount] = 1
    items = list(freq_map.items())  
    items.sort(key = lambda x :(-x[1],x[0]))
    result = []
    for i in range(min(2,len(items))):
     result.append(items[i][0])
    return result
user_input_str = input("Enter transaction amounts separated by spaces: ")
try:
    transactions = list(map(int, user_input_str.split()))
    print("Top 2 Transactions:", get_top_transactions(transactions))
except ValueError:
    print("Error: Please enter only valid integers separated by spaces.")




#Problem2
def calculate_missing_percentage(data):
    total_values = len(data)
    missing_count = 0
    for value in data:
        if value is None:
            missing_count += 1
    if total_values == 0:
        return 0.0
    percentage = (missing_count / total_values) * 100
    return round(percentage, 2)
user_input_str = input("Enter values separated by spaces (type 'None' for missing values): ")
data = []
try:
    for item in user_input_str.split():
        if item == 'None':
            data.append(None)
        else:
            data.append(int(item))
    print("Missing Value Percentage:", calculate_missing_percentage(data))
except ValueError:
    print("Error: Please enter only integers or 'None'.")

