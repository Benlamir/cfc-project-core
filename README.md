# Continuing Education Center (CFC)

A comprehensive university web application for managing continuing education programs. This project serves as a final year project capable of demonstrating modern web development practices, containerization, and modular architecture.

## Tech Stack

*   **Backend**: Python 3.11+ (Django 5.x + Django REST Framework)
*   **Frontend**: TypeScript (React + Vite)
*   **Database**: PostgreSQL
*   **Infrastructure**: Docker, Docker Compose, GitHub Actions
*   **Modeling**: PlantUML

## Architecture

We follow a modular, containerized architecture.
Key patterns:
*   **Fat Models, Thin Views** / Service Layer where appropriate.
*   **Role Based Access Control (RBAC)** across the system.

### Diagrams

*   [Use Case Diagram](docs/use_case_diagram.puml)

## Project Structure

A high-level overview of the repository structure:

*   `backend/` - Django project source code and API definitions.
*   `frontend/` - React/Vite application source code.
*   `infra/` - DevOps configuration (Docker, Nginx, CI/CD scripts).
*   `docs/` - Project documentation and UML diagrams.

## Getting Started

*(Instructions for running the project will be added as the infrastructure is set up)*