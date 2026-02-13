from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import Course, Establishment, Enrollment
from .serializers import CourseSerializer, EstablishmentSerializer, EnrollmentSerializer
from .permissions import IsCoordinatorOrReadOnly

class EstablishmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing establishments.
    """
    queryset = Establishment.objects.all().order_by('name')
    serializer_class = EstablishmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing courses.
    """
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCoordinatorOrReadOnly]

    def perform_create(self, serializer):
        # Assign current user as coordinator automatically on creation
        serializer.save(coordinator=self.request.user)

class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing enrollments.
    - Candidates can Create (POST) an enrollment for themselves.
    - Candidates can List (GET) only their own enrollments.
    - Coordinators can List (GET) all enrollments for their courses.
    """
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Enrollment.objects.all()
        
        # Le candidat ne voit que ses candidatures
        # Le coordinateur voit aussi les candidatures aux cours qu'il gère
        return Enrollment.objects.filter(
            models.Q(candidate=user) | 
            models.Q(course__coordinator=user)
        ).distinct()

    def perform_create(self, serializer):
        # Vérifier si le candidat a déjà une inscription pour ce cours
        course = serializer.validated_data['course']
        if Enrollment.objects.filter(course=course, candidate=self.request.user).exists():
            raise serializers.ValidationError("Vous êtes déjà inscrit à ce cours.")
            
        # Assigner automatiquement le candidat connecté
        serializer.save(candidate=self.request.user)
