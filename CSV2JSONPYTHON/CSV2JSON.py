import csv
import json

# Nombre del archivo CSV de entrada y salida
csv_file = 'perfumes.csv'
json_file = 'perfumes.json'

# Leer datos del archivo CSV y convertirlos a formato JSON
data = []
with open(csv_file, 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        data.append(row)

# Escribir datos en formato JSON al archivo de salida
with open(json_file, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print(f'Se ha creado el archivo JSON: {json_file}')
