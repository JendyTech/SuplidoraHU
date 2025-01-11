'use client'
import React, { useState, useEffect, use } from 'react';

import styles from '@modules/perfil/perfil.module.css';
import { getProfileInfo } from '@services/profile';
import { Profile } from '@interfaces/Profile/profile';
import CustomButton from '@shared/components/Buttons/CustomButton';
import { toast } from 'sonner';
import { useDelay } from '@/hooks/useDelay';
import { updatePassword } from '@services/users';
import { useLoader } from '@/contexts/Loader';

export default function ProfilePage() {
    const [user, setUser] = useState<Profile>();
    const [loading, setLoadings] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const { setLoading } = useLoader()



    const fetchUserProfile = async () => {
        try {
            setLoadings(true);
            const response = await getProfileInfo();
            // console.log(response);
            if (!response.ok) throw new Error('Error al cargar el perfil');
            const data = response.result;
            setUser(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar el perfil');
        } finally {
            setLoadings(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);
            useDelay(2000);

            const response = await updatePassword(user!._id, passwords.newPassword);
            if (!response.ok) {
                toast.error(response.messages[0].message);
                setLoading(false);
                return;
            }

            toast.success("Contraseña cambiada correctamente");


            setIsChangePasswordModalOpen(false);
            setLoading(false);


            // const response = await fetch('/api/user/change-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         currentPassword: passwords.currentPassword,
            //         newPassword: passwords.newPassword
            //     })
            // });

            // if (!response.ok) throw new Error('Failed to change password');
            // setIsChangePasswordModalOpen(false);
            // setPasswords({
            //     currentPassword: '',
            //     newPassword: '',
            //     confirmPassword: ''
            // });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to change password');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Perfil de Usuario</h1>

                <div className={styles.card}>
                    <div className={styles.profileHeader}>
                        <div className={styles.photoContainer}>
                            {user?.photo ? (
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className={styles.photo}
                                />
                            ) : (
                                <div className={styles.photoPlaceholder} style={{ fontSize: '60px', color: "white", backgroundColor: "#287881" }}>
                                    {user?.firstName.at(0)?.toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className={styles.userInfo}>
                            <div className={styles.field}>
                                <label className={styles.label}>Nombre</label>
                                <p className={styles.value}>{user?.firstName}</p>
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Apellido</label>
                                <p className={styles.value}>{user?.lastName}</p>
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Email</label>
                                <p className={styles.value}>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomButton onClick={() => setIsChangePasswordModalOpen(true)} text="Cambiar Contraseña" maxWidth="200px" />



                {isChangePasswordModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Cambiar Contraseña</h2>
                            <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>

                                <div className={styles.formField}>
                                    <label className={styles.label}>Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handlePasswordChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        onClick={() => setIsChangePasswordModalOpen(false)}
                                        className={styles.cancelButton}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.submitButton}
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}