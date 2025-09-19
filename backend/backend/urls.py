from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root(request):
    return JsonResponse({"message": "API running"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    path("", root),
]
