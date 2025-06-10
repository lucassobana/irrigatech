import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Loader2, AlertCircle, Plus } from 'lucide-react';
import { Datagrid, type Column } from '../../components/Datagrid';
import { ModalForm, type FormField } from '../../components/ModalForm';
import styles from './UsersList.module.css';

type Farm = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  farms: Farm[];
};

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<User[]>('/users');
      setUsers(res.data); // axios => data
      setError('');
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };


  const handleCreateUser = async (data: { name: string; email: string }) => {
    await api.post('/users', data);
    fetchUsers();
  };

  const formFields: FormField[] = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'farms',
      label: 'Fazendas',
      render: (_, row) =>
        row.farms && row.farms.length > 0
          ? row.farms.map((farm) => farm.name).join(', ')
          : 'Nenhuma',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Usuários</h2>
        <button className={styles.createButton} onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Criar Usuário
        </button>
      </div>

      {loading && (
        <div className={styles.loading}>
          <Loader2 className={styles.spinner} />
          Carregando usuários...
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <AlertCircle />
          {error}
        </div>
      )}

      {!loading && !error && (
        <Datagrid columns={columns} data={users} rowKey="id" />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Criar Usuário"
        formFields={formFields}
        onSubmit={handleCreateUser}
      />
    </div>
  );
}
