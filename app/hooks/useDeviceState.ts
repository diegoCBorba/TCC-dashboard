import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { DeviceState } from "../types/device"

export function useDeviceState(deviceId: string) {
  const [device, setDevice] = useState<DeviceState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carga inicial — busca o estado atual da tabela
    supabase
      .from("device_state")
      .select("*")
      .eq("device_id", deviceId)
      .single()
      .then(({ data }) => {
        setDevice(data)
        setLoading(false)
      })

    // Realtime — atualiza quando o Raspberry fizer upsert
    const channel = supabase
      .channel(`device_state:${deviceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "device_state",
          filter: `device_id=eq.${deviceId}`  // escuta só esse dispositivo
        },
        (payload) => setDevice(payload.new as DeviceState)
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [deviceId])

  return { device, loading }
}