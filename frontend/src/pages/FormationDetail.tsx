import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Clock, MapPin, GraduationCap, Calendar, CheckCircle2, ChevronLeft, Users, BookOpen } from 'lucide-react';

export function FormationDetail() {
    useParams(); // the id would be used for data fetching, but we are using mock data

    // Mock data for demonstration
    const formation = {
        title: "Master en Ingénierie des Systèmes d'Information",
        status: "Ouvert",
        etablissement: "École Nationale des Sciences Appliquées",
        niveau: "Master",
        domaine: "Informatique",
        dateDebut: "Septembre 2026",
        duree: "2 ans (4 semestres)",
        placesTotal: 30,
        placesRestantes: 12,
        prix: "45 000 MAD / an",
        description: "Ce Master forme des cadres de haut niveau capables de concevoir, développer et gérer des systèmes d'information complexes. Le programme met l'accent sur les architectures modernes, le cloud computing, et la gestion de projets agiles.",
        prerequis: [
            "Licence en Informatique ou diplôme équivalent",
            "Bon niveau en programmation (Java, Python, C++)",
            "Bases de données relationnelles"
        ],
        objectifs: [
            "Maîtriser les architectures logicielles distribuées",
            "Piloter des projets informatiques d'envergure",
            "Sécuriser les systèmes d'information",
            "S'intégrer dans une démarche DevOps"
        ]
    };

    return (
        <div className="animate-in fade-in duration-500 pb-12">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>

            {/* Hero Banner */}
            <div className="relative bg-slate-900 text-white min-h-[400px] flex items-center">
                {/* Placeholder image background with overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-0" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 w-full py-12">
                    <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${formation.status === 'Ouvert' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                                }`}>
                                {formation.status === 'Ouvert' && <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />}
                                Inscriptions: {formation.status}
                            </span>
                            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                                {formation.niveau}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                            {formation.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-slate-300 text-sm md:text-base">
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-emerald-400" />
                                {formation.etablissement}
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="mr-2 h-5 w-5 text-emerald-400" />
                                {formation.domaine}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column (Details) */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        <section className="bg-white dark:bg-slate-900 rounded-[12px] p-6 md:p-8 subtle-shadow border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold mb-4 font-heading text-slate-900 dark:text-white flex items-center">
                                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                                Présentation du programme
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                {formation.description}
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-white dark:bg-slate-900 rounded-[12px] p-6 md:p-8 subtle-shadow border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-4 font-heading text-slate-900 dark:text-white">Objectifs</h3>
                                <ul className="space-y-3">
                                    {formation.objectifs.map((obj, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                            <span className="text-slate-600 dark:text-slate-300">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-[12px] p-6 md:p-8 border border-emerald-100 dark:border-emerald-900/30">
                                <h3 className="text-xl font-bold mb-4 font-heading text-emerald-900 dark:text-emerald-400">Prérequis d'admission</h3>
                                <ul className="space-y-3 list-disc list-inside text-slate-700 dark:text-slate-300 marker:text-emerald-500">
                                    {formation.prerequis.map((req, idx) => (
                                        <li key={idx} className="pl-2">{req}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Right Column (Floating Sticky Sidebar) */}
                    <div className="w-full lg:w-1/3 border border-slate-200 dark:border-slate-800 p-6 rounded-[12px] bg-white dark:bg-slate-900 subtle-shadow lg:sticky lg:top-24">
                        <h3 className="text-xl font-bold mb-6 font-heading border-b border-slate-100 dark:border-slate-800 pb-4">Informations Clés</h3>

                        <div className="space-y-5 mb-8">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Date de début</p>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.dateDebut}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Durée</p>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.duree}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
                                    <span className="font-bold text-lg">💰</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Frais de scolarité</p>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.prix}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4 shrink-0 text-emerald-600 dark:text-emerald-400">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Places disponibles</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.placesRestantes} / {formation.placesTotal}</p>
                                        <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500"
                                                style={{ width: `${(formation.placesTotal - formation.placesRestantes) / formation.placesTotal * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Button
                                fullWidth
                                size="lg"
                                className={`text-base font-bold shadow-lg ${formation.status === 'Ouvert'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                                    : 'bg-slate-200 text-slate-500 cursor-not-allowed border-none shadow-none dark:bg-slate-800 dark:text-slate-500'
                                    }`}
                            >
                                {formation.status === 'Ouvert' ? 'Postuler Maintenant' : 'Inscriptions Clôturées'}
                            </Button>
                            <p className="text-xs text-center text-slate-500 mt-4">
                                En postulant, vous acceptez les conditions générales d'admission.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
