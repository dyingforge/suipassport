'use client'

import { useEffect, useState } from 'react'
import AdminStamp from '../@stamp/page'
import AdminDashboard from './@dashboard/page'
import { useApp } from '@/contexts/app-context'
import { useUserProfile } from '@/contexts/user-profile-context'
import { isValidSuiAddress } from '@mysten/sui/utils'
import { useRouter } from 'next/navigation'
import { useBetterSignAndExecuteTransaction } from '@/hooks/use-better-tx'
import { set_admin } from '@/contracts/stamp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/toast'
import { useNetworkVariables } from '@/contracts'

export default function AdminPage() {
  const { stamps, fetchUsers,refreshStamps } = useApp()
  const { userProfile } = useUserProfile()
  const router = useRouter()
  const networkVariables = useNetworkVariables()
  const { handleSignAndExecuteTransaction: handleSetAdminTx } = useBetterSignAndExecuteTransaction({
    tx: set_admin
  })
  const [recipient, setRecipient] = useState('')

  const handleSetAdmin = async () => {
    if (!userProfile?.is_admin) {
      showToast.error('You are not admin')
      return
    }
    if (!isValidSuiAddress(recipient)) {
      showToast.error('Recipient is not valid')
      return
    }
    await handleSetAdminTx({
      adminCap: userProfile?.superAdmincap,
      recipient: recipient
    }).onSuccess(() => {
      showToast.success('Admin set successfully')
    }).execute()
  }

  useEffect(() => {
    if (!userProfile?.is_admin) {
      router.push('/')
      return
    }
    fetchUsers()
    refreshStamps(networkVariables)
  }, [fetchUsers, refreshStamps, userProfile, router, networkVariables])

  return (
    <div className="w-full lg:p-24 lg:pb-48 bg-background space-y-24">
      {(
        <>
          <div className="lg:absolute top-32 right-24 p-4">
            <div className="flex w-72 gap-4 bg-card border border-border shadow-md shadow-border p-4 rounded-lg">
              <Input placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              <Button onClick={handleSetAdmin}>Set Admin</Button>
            </div>
          </div>
          <AdminStamp stamps={stamps} admin={true} />
          <AdminDashboard />
        </>
      )}
    </div>
  )
} 