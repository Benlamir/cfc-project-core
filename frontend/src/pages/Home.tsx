import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

// Interface pour les données (à déplacer dans un fichier de types partagé plus tard)
interface Establishment {
    id: number;
    name: string;
    code: string;
    logo: string | null;
}

interface Course {
    id: number;
    title: string;
    description: string;
    establishment_details: Establishment;
    status: string;
    start_date: string;
    end_date: string;
    is_open: boolean;
}

const Home: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterEstablishment, setFilterEstablishment] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/');
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement des formations", err);
                setError("Impossible de charger le catalogue. Veuillez réessayer plus tard.");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Filtrage simple côté client pour l'instant
    const filteredCourses = courses.filter(course => {
        const matchEstablishment = filterEstablishment ? course.establishment_details.name.includes(filterEstablishment) : true;
        const matchStatus = filterStatus ? course.status === filterStatus : true;
        return matchEstablishment && matchStatus;
    });

    const uniqueEstablishments = Array.from(new Set(courses.map(c => c.establishment_details.name)));

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* 1. Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-900 tracking-tight">CFC</span>
                    </div>
                    <nav className="flex space-x-8">
                        <Link to="/" className="text-blue-900 font-medium hover:text-blue-700">Formations</Link>
                        <a href="#" className="text-gray-600 hover:text-blue-900 transition">À propos</a>
                        <Link to="/login" className="text-gray-600 hover:text-blue-900 transition">Connexion</Link>
                    </nav>
                </div>
            </header>

            {/* 2. Hero Section */}
            <div className="bg-gray-100 py-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                        Développez vos compétences
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez nos formations certifiantes et continuez d'apprendre avec les meilleurs experts universitaires.
                    </p>
                </div>
            </div>

            {/* 3. Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between border border-gray-100">
                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50"
                            value={filterEstablishment}
                            onChange={(e) => setFilterEstablishment(e.target.value)}
                        >
                            <option value="">Tous les établissements</option>
                            {uniqueEstablishments.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <select
                            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">Tous les statuts</option>
                            <option value="PUBLISHED">Publié</option>
                            <option value="DRAFT">Brouillon</option>
                        </select>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            {/* 4. Course Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Chargement du catalogue...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">{error}</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                        Aucune formation ne correspond à vos critères.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                                <div className="h-48 bg-gray-200 relative overflow-hidden">
                                    {/* Placeholder Image - could be replaced by real image if available */}
                                    {course.establishment_details.logo ? (
                                        <img src={course.establishment_details.logo} alt={course.establishment_details.name} className="w-full h-full object-cover transition transform group-hover:scale-105 duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                        </div>
                                    )}
                                    {course.is_open && (
                                        <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm">
                                            Inscriptions Ouvertes
                                        </span>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center mb-3">
                                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {course.establishment_details.name}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                        {course.description}
                                    </p>

                                    <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                                        <div className="text-xs text-gray-500">
                                            <div>Début : {course.start_date || 'Non défini'}</div>
                                            <div>Fin : {course.end_date || 'Non défini'}</div>
                                        </div>
                                        <Link to={`/courses/${course.id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition">
                                            Détails
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* 5. Footer */}
            <footer className="bg-white border-t border-gray-200 mt-20">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            &copy; 2026 Centre de Formation Continue. Tous droits réservés.
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">Mentions légales</a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
