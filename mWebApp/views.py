import json
from django.http import HttpResponse
from django.shortcuts import render
from mWebApp.models import movieSearchModel
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        # print(body_unicode)
        # request.body  # json.loads(body_unicode)
        received_json = json.loads(body_unicode)
        print(received_json)
        title = received_json.get('title')
        year = received_json.get('year')
        rate = received_json.get('rate')
        searchedQuery = received_json.get('searchQuery')
        imDBID = received_json.get('imdbID')
        movieSearchModel.objects.create(
            Title=title, release_date=year, rating=rate, searchQuery=searchedQuery, imdbID=imDBID)
    return render(request, 'base.html')


def simple_func(request):
    return render(request, 'abc.html')
