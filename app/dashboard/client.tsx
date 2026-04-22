"use client";

import { useEffect, useState } from "react";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

type ClientProps = {
  greeting: string;
  firstName: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function Client({ greeting, firstName }: ClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "customer" | "customers">("overview");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch customers list
  async function fetchCustomers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data: Customer[] = await res.json();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "customer" || activeTab === "customers") {
      fetchCustomers();
    }
  }, [activeTab]);

  function openCreateForm() {
    setEditingCustomer(null);
    setFormData({ name: "", email: "", phone: "" });
    setFormError(null);
  }

  function openEditForm(customer: Customer) {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone || "" });
    setFormError(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await fetch(`/api/dashboard/customers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete customer");
      setCustomers(customers.filter(c => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete customer");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      const method = editingCustomer ? "PUT" : "POST";
      const url = editingCustomer ? `/api/dashboard/customers/${editingCustomer.id}` : "/api/dashboard/customers";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save customer");
      }
      const savedCustomer: Customer = await res.json();
      if (editingCustomer) {
        setCustomers(customers.map(c => (c.id === savedCustomer.id ? savedCustomer : c)));
      } else {
        setCustomers([savedCustomer, ...customers]);
      }
      setEditingCustomer(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save customer");
    } finally {
      setFormLoading(false);
    }
  }

  // Added separate Customers tab to nav
  // The original "customer" tab remains for legacy or overview content if needed,
  // and the new "customers" tab is wired to customer CRM view.

  return (
    <>
      <nav className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          type="button"
          className={`py-2 px-4 font-medium ${activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("overview")}
          aria-current={activeTab === "overview" ? "page" : undefined}
        >
          Overview
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium ${activeTab === "customer" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("customer")}
          aria-current={activeTab === "customer" ? "page" : undefined}
        >
          Customer Overview
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium ${activeTab === "customers" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("customers")}
          aria-current={activeTab === "customers" ? "page" : undefined}
        >
          Customers
        </button>
      </nav>

      {activeTab === "overview" && (
        <DashboardContent greeting={greeting} firstName={firstName} />
      )}

      {activeTab === "customer" && (
        <div>
          {/* Existing "customer" tab content if any; keep unchanged */}
          <p>This is the legacy Customer overview tab content.</p>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Customers</h2>
            <button
              type="button"
              className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
              onClick={openCreateForm}
            >
              + New Customer
            </button>
          </div>

          {loading && <p>Loading customers...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && customers.length === 0 && <p>No customers found. Create a new one.</p>}

          {!loading && !error && customers.length > 0 && (
            <table className="min-w-full border border-gray-300 rounded overflow-hidden text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">Name</th>
                  <th className="px-4 py-2 border-b border-gray-300">Email</th>
                  <th className="px-4 py-2 border-b border-gray-300">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-300">{customer.name}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{customer.email}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{customer.phone || "-"}</td>
                    <td className="px-4 py-2 border-b border-gray-300 text-right space-x-2">
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => openEditForm(customer)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(editingCustomer !== null || formData.name || formData.email) && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-md border rounded p-4">
              <h3 className="text-xl font-semibold">{editingCustomer ? "Edit Customer" : "New Customer"}</h3>
              {formError && <p className="text-red-600">{formError}</p>}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {formLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  disabled={formLoading}
                  onClick={() => {
                    setEditingCustomer(null);
                    setFormData({ name: "", email: "", phone: "" });
                    setFormError(null);
                  }}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}

  return (
    <>
      <nav className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          type="button"
          className={`py-2 px-4 font-medium ${activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("overview")}
          aria-current={activeTab === "overview" ? "page" : undefined}
        >
          Overview
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium ${activeTab === "customer" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("customer")}
          aria-current={activeTab === "customer" ? "page" : undefined}
        >
          Customers
        </button>
      </nav>

      {activeTab === "overview" && (
        <DashboardContent greeting={greeting} firstName={firstName} />
      )}

      {activeTab === "customer" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Customers</h2>
            <button
              type="button"
              className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
              onClick={openCreateForm}
            >
              + New Customer
            </button>
          </div>

          {loading && <p>Loading customers...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && customers.length === 0 && <p>No customers found. Create a new one.</p>}

          {!loading && !error && customers.length > 0 && (
            <table className="min-w-full border border-gray-300 rounded overflow-hidden text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">Name</th>
                  <th className="px-4 py-2 border-b border-gray-300">Email</th>
                  <th className="px-4 py-2 border-b border-gray-300">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-300">{customer.name}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{customer.email}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{customer.phone || "-"}</td>
                    <td className="px-4 py-2 border-b border-gray-300 text-right space-x-2">
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => openEditForm(customer)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(editingCustomer !== null || formData.name || formData.email) && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-md border rounded p-4">
              <h3 className="text-xl font-semibold">{editingCustomer ? "Edit Customer" : "New Customer"}</h3>
              {formError && <p className="text-red-600">{formError}</p>}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  disabled={formLoading}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {formLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  disabled={formLoading}
                  onClick={() => {
                    setEditingCustomer(null);
                    setFormData({ name: "", email: "", phone: "" });
                    setFormError(null);
                  }}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
