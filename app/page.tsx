"use client"
import { useDeviceState } from "./hooks/useDeviceState"

export default function Home() {
  const { device, loading } = useDeviceState("esp32_01")

  if (loading) return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p className="text-slate-500 text-sm">Carregando...</p>
    </main>
  )

  if (!device) return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p className="text-slate-500 text-sm">Dispositivo não encontrado.</p>
    </main>
  )

  const uptime =
    `${Math.floor(device.uptime_s / 3600).toString().padStart(2, "0")}:` +
    `${Math.floor((device.uptime_s % 3600) / 60).toString().padStart(2, "0")}:` +
    `${(device.uptime_s % 60).toString().padStart(2, "0")}`

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">

        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-800">
            Dashboard de Irrigação
          </h1>
          <p className="text-sm text-slate-500">
            Dispositivo: {device.device_id}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-6">

          {/* Status */}
          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-sm text-slate-500 mb-1">Status</p>
            <p className="text-lg font-semibold">
              {device.online ? (
                <span className="text-green-600">🟢 Online</span>
              ) : (
                <span className="text-red-600">🔴 Offline</span>
              )}
            </p>
          </div>

          {/* Bomba */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">Bomba</p>
            <p className="text-lg text-gray-600 font-semibold">
              {device.pump === "on" ? "💧 Ligada" : "⚫ Desligada"}
            </p>
          </div>

          {/* Uptime */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">Uptime</p>
            <p className="text-lg text-gray-600 font-mono font-semibold">
              {uptime}
            </p>
          </div>

          {/* Atualização */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">Última atualização</p>
            <p className="text-lg text-gray-600 font-semibold">
              {new Date(device.updated_at).toLocaleTimeString("pt-BR")}
            </p>
          </div>

        </div>

      </div>
    </main>
  )
}