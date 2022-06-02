from django.http import JsonResponse


def ApiRoutes(request):

  route = [

      {'GET': 'api/projects'},
      {'GET': 'api/projects/id'},
      {'PUT': 'api/projects/id'},


      {'POST': 'api/users/token'},
      {'POST': 'api/users/token/request'}

  ]

  return JsonResponse(route,safe= False)
