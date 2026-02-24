import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Lock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Authentication() {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="absolute inset-0 z-0 bg-emerald-900/5 dark:bg-emerald-900/10" style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(6, 95, 70, 0.1), transparent 70%)' }} />

            <div className="z-10 w-full max-w-md">
                <div className="text-center mb-8 flex flex-col items-center">
                    <div className="h-16 w-16 bg-primary text-white rounded-[12px] flex items-center justify-center shadow-lg shadow-emerald-600/20 mb-4">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">CFC<span className="text-primary">.</span>edu</h1>
                    <p className="text-slate-500 mt-2">Centre de Formation Continue</p>
                </div>

                <Card className="border-0 shadow-lg subtle-shadow">
                    <CardHeader className="space-y-1 text-center pb-6">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            {isLogin ? 'Bon retour' : 'Créer un compte'}
                        </CardTitle>
                        <CardDescription>
                            {isLogin
                                ? 'Entrez vos identifiants pour accéder à votre espace'
                                : 'Remplissez ce formulaire pour postuler à nos formations'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 নাঁ0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nom complet"
                                            className="flex h-11 w-full rounded-[8px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Adresse e-mail"
                                        className="flex h-11 w-full rounded-[8px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Mot de passe"
                                        className="flex h-11 w-full rounded-[8px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                    />
                                </div>
                                {isLogin && (
                                    <div className="text-right">
                                        <a href="#" className="text-sm font-medium text-primary hover:underline">Mot de passe oublié ?</a>
                                    </div>
                                )}
                            </div>

                            <Button type="button" fullWidth className="mt-6 bg-emerald-700 hover:bg-emerald-800 text-white shadow-md">
                                {isLogin ? 'Se connecter' : "S'inscrire"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-500">
                            {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-1 text-primary font-medium hover:underline focus:outline-none"
                            >
                                {isLogin ? "S'inscrire" : 'Se connecter'}
                            </button>
                        </div>

                        <div className="mt-8 text-center text-xs text-slate-400">
                            <Link to="/" className="hover:text-primary transition-colors hover:underline">
                                Continuer vers l'accueil (Demo)
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
