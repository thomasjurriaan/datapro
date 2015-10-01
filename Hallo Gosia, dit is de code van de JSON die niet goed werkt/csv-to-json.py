import csv
import json

csvfile = open('Temperatuurdata.csv', 'r')
jsonfile = open('Temperatuurdata.json', 'w')

fieldnames = ("Date", "Temperature")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
	json.dump(row, jsonfile)
	jsonfile.write(',\n')