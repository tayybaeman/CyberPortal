from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, HWFormViewSet, CSFormViewSet
from rest_framework_simplejwt.views import TokenRefreshView

# Create router and register viewsets
router = DefaultRouter()
router.register(r'hw', HWFormViewSet)
router.register(r'cs', CSFormViewSet)

# Combine all URL patterns
urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('api/', include(router.urls)),
]
