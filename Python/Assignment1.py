def find_most_frequent_category(data):
    invalid_values = {"?", "N/A", "None", ""}
    
    valid_data = []
    for item in data:
        if item not in invalid_values:
            valid_data.append(item)
    
    frequency_map = {}
    for category in valid_data:
        if category in frequency_map:
            frequency_map[category] += 1
        else:
            frequency_map[category] = 1
            
    most_frequent_category = None
    max_count = 0
    
    for category, count in frequency_map.items():
        if count > max_count:
            max_count = count
            most_frequent_category = category
            
    if most_frequent_category:
        return f"Most Frequent Category: {most_frequent_category} ({max_count} times)"
    else:
        return "No valid categories found."

data = ["red", "blue", "?", "green", "blue", "", "N/A", "green", "blue"]
print(find_most_frequent_category(data))