import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
    try {
        const url =
            "https://accounts.spotify.com/api/token?" +
            new URLSearchParams({
                client_id: process.env.SPOTIFY_CLIENT_ID!,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_SECRET_ID as string,
            authorization:
                "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read",
        }),
    ],
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Initial sign in
            if (account && user) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.user = user;
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token }: any) {
            if (!token || !token.user || !token.accessToken) return null;
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refresh_token;
            return session;
        },
    },
};

export default NextAuth(authOptions);