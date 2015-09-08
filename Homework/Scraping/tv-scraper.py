#!/usr/bin/env python
# Name: Thomas van der Veen
# Student number: 10346481
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
#print dom.body.content
    Title = []
    Ranking = []
    Genre = []
    Actors = []
    Runtime = []
    '''
    TitleOdd = []
    TitleEven = []
    for e in dom.by_tag("tr.even detailed"):
            for a in e.by_tag("td.image"):
                for attribute in a.by_tag("a"):
                    TitleEven.append(attribute.attrs["title"])

    for e in dom.by_tag("tr.odd detailed"):
        for a in e.by_tag("td.image"):
            for attribute in a.by_tag("a"):
                TitleOdd.append(attribute.attrs["title"])

    i = 0
    while i<50:
        if i%2==0:
            Title.append(TitleEven[i])
        else:
            Title.append(TitleOdd[i])
    '''
    #Search HTML file for ranking using classes and tags
    for e in dom.by_tag("span.rating-rating"):
        ranking = 0
        for a in e.by_tag("span.value"):
            ranking = a.content
        Ranking.append(ranking)

    # Search for genres. First appending to smaller list of three genres, then appending smaller list to bigger list of genres.
    for e in dom.by_tag("span.genre"):
        genre3 = []
        for a in e.by_tag("a")[:3]:
            genre3.append(a.content)
        Genre.append(genre3)

    #Search for actors the same way genres searches for genres: appending to a smaller list first, then appending the small list to the big list.
    for e in dom.by_tag("span.credit"):
        actor3 = []
        for a in e.by_tag("a")[:3]:
            actor3.append(a.content)
        Actors.append(actor3)
    
    #search for Runtime in HTML file
    for e in dom.by_tag("span.runtime"):
        runtimestring = e.content
        runtimestring = runtimestring[:3] # delete unneccesary info
        Runtime.append(runtimestring)

    #Making a big list from all the lists per category.
    Endlist = []
    subendlist = []
    i = 0
    while i < 50: # Loop through all the series. Append the content of the categories for current serie.
        #Endlist.append(Title[i])
        Endlist.append(Ranking[i])
        Endlist.append(Genre[i])
        Endlist.append(Actors[i])
        Endlist.append(Runtime[i])
        i += 1

    return [Endlist]


    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
    
    

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Ranking', 'Genre', 'Actors', 'Runtime'])

    # write the right element of the big list to its place in the row (doesnt work yet)
    while i <50:
        writer.writerow(tvseries[0 + i*4], tvseries[1 + i*4], tvseries[2 + i*4], tvseries[3 + i*4])
        i += 1

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)