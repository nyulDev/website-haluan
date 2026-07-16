"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Edit, Trash2, Search, Mail, Shield, Users, AlertCircle, Lock } from "lucide-react";
import { createUser, updateUser, deleteUser } from "@/app/actions/user";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

function getRoleBadge(role: string) {
  switch (role) {
    case "admin":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200/60">
          <Shield className="w-3 h-3" />
          Admin
        </span>
      );
    case "editor":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/60">
          <Edit className="w-3 h-3" />
          Editor
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-50 to-gray-100 text-slate-600 border border-slate-200/60">
          <Users className="w-3 h-3" />
          User
        </span>
      );
  }
}

function getInitials(name: string | null, email: string) {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email[0].toUpperCase();
}

function getAvatarColor(email: string) {
  const colors = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-purple-400",
    "from-emerald-500 to-teal-400",
    "from-rose-500 to-pink-400",
    "from-amber-500 to-orange-400",
    "from-indigo-500 to-blue-400",
    "from-fuchsia-500 to-pink-400",
    "from-lime-500 to-green-400",
  ];
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function UserManagement({ users: initialUsers }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const filteredUsers = initialUsers.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.email.toLowerCase().includes(q) ||
      (user.name?.toLowerCase() || "").includes(q) ||
      user.role.toLowerCase().includes(q)
    );
  });

  function resetForm() {
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormRole("user");
    setShowPassword(false);
    setError(null);
  }

  function openEditDialog(user: User) {
    setSelectedUser(user);
    setFormName(user.name || "");
    setFormEmail(user.email);
    setFormPassword("");
    setFormRole(user.role);
    setShowPassword(false);
    setError(null);
    setEditOpen(true);
  }

  function openDeleteDialog(user: User) {
    setSelectedUser(user);
    setDeleteOpen(true);
  }

  function handleAddSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createUser(formData);
      if (result?.success === false) {
        setError(result.error || "Gagal membuat user");
      } else {
        setAddOpen(false);
        resetForm();
      }
    });
  }

  function handleEditSubmit(formData: FormData) {
    if (!selectedUser) return;
    startTransition(async () => {
      const result = await updateUser(selectedUser.id, formData);
      if (result?.success === false) {
        setError(result.error || "Gagal mengupdate user");
      } else {
        setEditOpen(false);
        setSelectedUser(null);
        resetForm();
      }
    });
  }

  function handleDelete() {
    if (!selectedUser) return;
    startTransition(async () => {
      const result = await deleteUser(selectedUser.id);
      if (result?.success === false) {
        setError(result.error || "Gagal menghapus user");
      } else {
        setDeleteOpen(false);
        setSelectedUser(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            User Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Kelola pengguna dan atur hak akses mereka
          </p>
        </div>
        <Dialog
          open={addOpen}
          onOpenChange={(open) => {
            setAddOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah User Baru</DialogTitle>
              <DialogDescription>
                Masukkan data user baru di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <form action={handleAddSubmit}>
              <div className="space-y-4 py-4">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="add-name">Nama</Label>
                  <Input
                    id="add-name"
                    name="name"
                    placeholder="Nama lengkap"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="add-email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="add-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      required
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-role">Role</Label>
                  <input type="hidden" name="role" value={formRole} />
                  <Select
                    value={formRole}
                    onValueChange={setFormRole}
                  >
                    <SelectTrigger id="add-role">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setAddOpen(false);
                    resetForm();
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">
                {initialUsers.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 rounded-lg">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Admin</p>
              <p className="text-2xl font-bold text-slate-900">
                {initialUsers.filter((u) => u.role === "admin").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Edit className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Editor</p>
              <p className="text-2xl font-bold text-slate-900">
                {initialUsers.filter((u) => u.role === "editor").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Cari user berdasarkan nama, email, atau role..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 border-b text-slate-600">
            <tr>
              <th className="px-6 py-3.5 font-medium">User</th>
              <th className="px-6 py-3.5 font-medium">Email</th>
              <th className="px-6 py-3.5 font-medium">Role</th>
              <th className="px-6 py-3.5 font-medium">Bergabung</th>
              <th className="px-6 py-3.5 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-8 h-8 text-slate-300" />
                    <p className="font-medium text-slate-500">
                      {searchQuery
                        ? "Tidak ada user yang cocok"
                        : "Belum ada user"}
                    </p>
                    <p className="text-sm">
                      {searchQuery
                        ? "Coba kata kunci lain"
                        : 'Klik "Tambah User" untuk menambahkan user baru'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(
                          user.email
                        )} flex items-center justify-center text-white text-sm font-semibold shadow-sm`}
                      >
                        {getInitials(user.name, user.email)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {user.name || "-"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                        onClick={() => openDeleteDialog(user)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table footer */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-3 bg-slate-50/50 border-t text-sm text-slate-500">
            Menampilkan {filteredUsers.length} dari {initialUsers.length} user
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) {
            setSelectedUser(null);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Ubah informasi user di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form action={handleEditSubmit}>
            <div className="space-y-4 py-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama</Label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="Nama lengkap"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">Password</Label>
                <div className="relative">
                  <Input
                    id="edit-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400">Kosongkan jika tidak ingin mengubah password</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <input type="hidden" name="role" value={formRole} />
                <Select
                  value={formRole}
                  onValueChange={setFormRole}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditOpen(false);
                  setSelectedUser(null);
                  resetForm();
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus User</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
                  selectedUser.email
                )} flex items-center justify-center text-white text-sm font-semibold`}
              >
                {getInitials(selectedUser.name, selectedUser.email)}
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {selectedUser.name || selectedUser.email}
                </p>
                <p className="text-sm text-slate-500">{selectedUser.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedUser(null);
              }}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? "Menghapus..." : "Hapus User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
