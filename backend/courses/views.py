from rest_framework import viewsets, permissions
from .models import Course, Establishment
from .serializers import CourseSerializer, EstablishmentSerializer
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
