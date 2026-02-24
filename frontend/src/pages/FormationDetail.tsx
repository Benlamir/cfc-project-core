import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Clock, MapPin, GraduationCap, Calendar, CheckCircle2, ChevronLeft, Users, BookOpen, X, Upload, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';

export function FormationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [motivation, setMotivation] = React.useState('');
    const [cvFile, setCvFile] = React.useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            setFirstName((user as any).first_name || '');
            setLastName((user as any).last_name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    // Mock data for demonstration
    const formation = {
        id: id || 1,
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCvFile(e.target.files[0]);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!cvFile) {
            setError('Veuillez joindre votre CV.');
            return;
        }

        // File validation: 5MB max
        if (cvFile.size > 5 * 1024 * 1024) {
            setError('Le fichier ne doit pas dépasser 5 Mo.');
            return;
        }

        // File validation: PDF and Word docs
        const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!acceptedTypes.includes(cvFile.type)) {
            setError('Seuls les formats PDF et Word (.doc, .docx) sont acceptés.');
            return;
        }

        if (!firstName || !lastName || !email || !phone) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('course', formation.id.toString());
            formData.append('cv_file', cvFile);

            const documentsData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                motivation: motivation
            };
            formData.append('documents', JSON.stringify(documentsData));

            // Submitting as multipart/form-data
            await api.post('/enrollments/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSuccess(false);
                navigate('/dashboard/mes-candidatures');
            }, 2000);

        } catch (err: any) {
            console.error(err);
            if (err.response?.data) {
                const data = err.response.data;
                if (Array.isArray(data)) {
                    setError(data[0]);
                } else if (data.non_field_errors) {
                    setError(data.non_field_errors[0]);
                } else if (typeof data === 'object') {
                    // Extract the first key's error message
                    const firstKey = Object.keys(data)[0];
                    if (Array.isArray(data[firstKey])) {
                        setError(data[firstKey][0]);
                    } else {
                        setError(JSON.stringify(data));
                    }
                } else {
                    setError('Erreur lors de la soumission.');
                }
            } else {
                setError('Impossible de se connecter au serveur.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 pb-12 relative">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>

            {/* Hero Banner */}
            <div className="relative bg-slate-900 text-white min-h-[400px] flex items-center">
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

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
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
                                <BookOpen className="mr-3 h-6 w-6 text-emerald-600 dark:text-emerald-500" />
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
                        <h3 className="text-xl font-bold mb-6 font-heading border-b border-slate-100 dark:border-slate-800 pb-4 text-slate-900 dark:text-white">Informations Clés</h3>

                        <div className="space-y-5 mb-8">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Date de début</p>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.dateDebut}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Durée</p>
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{formation.duree}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0 text-slate-600 dark:text-slate-300">
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
                                onClick={() => setIsModalOpen(true)}
                                disabled={formation.status !== 'Ouvert'}
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

            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        {/* Close button */}
                        <button
                            onClick={() => !isSubmitting && !success && setIsModalOpen(false)}
                            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-8">
                            {success ? (
                                <div className="text-center py-12 animate-in zoom-in duration-300">
                                    <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Candidature Soumise !</h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Votre dossier pour <span className="font-semibold text-slate-800 dark:text-slate-200">{formation.title}</span> a bien été transmis.
                                    </p>
                                    <p className="text-sm text-slate-500 mt-4">Redirection vers vos candidatures...</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pr-8">
                                        Dossier de candidature
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                                        Vous postulez pour : <strong className="text-slate-700 dark:text-slate-300">{formation.title}</strong>
                                    </p>

                                    {error && (
                                        <div className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Prénom *</label>
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                    className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom de famille *</label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                    className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="votre@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Téléphone *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+212 6..."
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Lettre de motivation (Optionnelle)</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Partagez vos motivations pour ce programme..."
                                                value={motivation}
                                                onChange={(e) => setMotivation(e.target.value)}
                                                className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow resize-none dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:ring-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                                                <span>CV ou Dossier complet *</span>
                                                <span className="text-xs text-slate-400 font-normal">PDF/Word, max 5Mo</span>
                                            </label>
                                            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                                                    {cvFile ? (
                                                        <>
                                                            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
                                                                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-full px-4">{cvFile.name}</p>
                                                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Fichier sélectionné</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                                                                <Upload className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Cliquez pour ajouter votre CV</p>
                                                            <p className="text-xs text-slate-500 mt-1">ou glissez-déposez le fichier ici</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                disabled={isSubmitting}
                                                className="dark:border-slate-700 dark:text-slate-300"
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || !cvFile}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
                                            >
                                                {isSubmitting ? 'Envoi...' : 'Confirmer l\'envoi'}
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
