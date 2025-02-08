import Sidebar from '../../components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
}
