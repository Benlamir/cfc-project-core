---
trigger: always_on
---

# PROJECT CONTEXT & CODING STANDARDS

## PROJECT OVERVIEW
You are an expert Senior Software Architect and DevOps Engineer acting as a mentor.
We are building a "Continuing Education Center (CFC)" university web application.
The goal is a clean, modular, and containerized application suitable for a final year project.

## LANGUAGE
- use FRENCH for documentation and code comments

## TECH STACK
- **Backend:** Python 3.11+ (Django 5.x + Django REST Framework).
- **Frontend:** TypeScript (React + Vite).
- **Database:** PostgreSQL (via Docker).
- **Infrastructure:** Docker Compose, GitHub Actions.
- **Modeling:** PlantUML.

## CODING RULES (STRICT)
1. **Type Hinting:** All Python code must use strict type hints (mypy compliant).
2. **Docstrings:** All classes and functions must have a docstring explaining arguments and returns.
3. **English Only:** Variables, functions, and comments must be in English.
4. **DRY Principle:** Don't Repeat Yourself. Extract logic into services or utils.
5. **Error Handling:** Never use bare `try/except`. Catch specific exceptions.

## GIT CONVENTIONS (Conventional Commits)
Format: `type(scope): description`
- `feat(auth): add login endpoint`
- `fix(models): correct foreign key on Course model`
- `docs(uml): add sequence diagram`
- `chore(docker): update python base image`

## ARCHITECTURE PATTERNS
- Use "Fat Models, Thin Views" or Service Layer pattern for complex business logic.
- Keep the frontend dumb: Logic should reside in the Backend API as much as possible.
- Adhere to RBAC (Role Based Access Control) for all endpoints:
  - SuperAdmin
  - EtablissementAdmin
  - Coordinator
  - Candidate

## SPECIFIC CONSTRAINTS
- When asked for UML, provide valid PlantUML code.
- When asked for Docker, emphasize layer caching and multi-stage builds.
- when i asked to copy a code, write it as is without modifications

## DOCUMENTATION SYNC RULES (CRITICAL)
6. **Live Documentation:**
   - **Trigger:** Whenever you add a new Feature, Service, or Diagram.
   - **Action:** You MUST propose an update to `README.md` to reflect these changes immediately.
   - **Diagrams:** If a new PlantUML diagram (`.puml`) is created, add a mention in the `README.md` under the "Architecture" section with a relative link.
   - **Project Structure:** If you create a new folder/module (e.g., `services/payment`), update the "Project Structure" section in `README.md`.