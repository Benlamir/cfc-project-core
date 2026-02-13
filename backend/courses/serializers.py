from rest_framework import serializers
from .models import Course, Establishment, Enrollment

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id', 'name', 'code', 'logo', 'description', 'manager', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class CourseSerializer(serializers.ModelSerializer):
    # Vue détaillée de l'établissement (lecture seule)
    establishment_details = EstablishmentSerializer(source='establishment', read_only=True)
    
    # Champ calculé pour savoir si ouvert
    is_open = serializers.BooleanField(source='is_open_for_registration', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 
            'title', 
            'description', 
            'establishment', 
            'establishment_details',
            'coordinator', 
            'status', 
            'start_date', 
            'end_date',
            'registration_open_date', 
            'registration_close_date', 
            'capacity',
            'is_open',
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_details', 'candidate', 'status', 'application_date', 'rejection_reason', 'documents']
        read_only_fields = ['id', 'candidate', 'status', 'application_date', 'rejection_reason']
        # 'candidate' est read-only car il sera rempli automatiquement avec l'user connecté
        # 'status' est read-only pour la création (commence toujours à PRE_ENROLLED)
