import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { ThemedView } from './ThemedView'

export default function Auth() {
  async function signInWithAzure() {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: 'stockassoc-visitor-app://auth/callback',
      }
    })
  }

  return (
    <ThemedView>
      <Button
        title="Sign in with Azure"
        onPress={signInWithAzure}
        icon={{
          name: 'windows',
          type: 'ant-design',
          size: 24,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        iconPosition='right'
      />
    </ThemedView>
  )
}