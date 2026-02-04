from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EstablishmentViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'establishments', EstablishmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
