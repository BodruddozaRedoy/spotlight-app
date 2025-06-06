import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/dist/token-cache'
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

export default function ClerkAndConvexProvider({ children }: { children: React.ReactNode }) {
    const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string);

    return (
        <ClerkProvider tokenCache={tokenCache}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk >
        </ClerkProvider>
    )
}