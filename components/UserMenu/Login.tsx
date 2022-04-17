import { ApolloError, gql, useMutation } from '@apollo/client'
import { MailIcon } from '@heroicons/react/solid'
import MetaMaskOnboarding from '@metamask/onboarding';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { getNonce, getNonceVariables } from '../../__generated__/getNonce';
import { signatureLogin, signatureLoginVariables } from '../../__generated__/signatureLogin';
import { LOGGEDIN_USER_COOKIE_NAME } from './constants';

declare var window: any

export const GET_NONCE_MUTATION = gql`
  mutation getNonce($address: String!) {
    getNonce(input: {
      address: $address
    }) {
      ok
      error
      address
      messageToSign
    }
  }
`;

export const SIGNATURE_LOGIN_MUTATION = gql`
  mutation signatureLogin($address: String!, $signature: String!) {
    signatureLogin(input: {
      address: $address,
      signature: $signature
    }) {
      ok
      error
      data {
        accessToken
        user {
          address
          username
          enabled
        }
      }
    }
  }
`;

export default function Login() {

  const [_, setCookie] = useCookies([LOGGEDIN_USER_COOKIE_NAME]);
  const router = useRouter();

  const onError = (error: ApolloError) => console.log(`error: ${error}`);

  const onSignatureLoginCompleted = async ({ signatureLogin }: signatureLogin) => {
    const { ok, error, data } = signatureLogin;
    if (ok) {
      const expires = new Date()
      expires.setDate(expires.getDate() + 365);
      const { accessToken, user } = data!;
      setCookie(LOGGEDIN_USER_COOKIE_NAME, { accessToken, user }, {
        path: '/',
        expires,
      })

      router.push('/main-room');
    } else {
      console.log(`signatureLogin error: ${error}`);
    }
  }

  const [signatureLogin, { loading: signatureLoginLoading }] = useMutation<signatureLogin, signatureLoginVariables>(SIGNATURE_LOGIN_MUTATION, 
    { onCompleted: onSignatureLoginCompleted, onError})


  const onGetNonceCompleted = async ({ getNonce }: getNonce) => {
    const { ok, error, messageToSign, address } = getNonce;
    if (ok) {
      console.log(`messageToSign: ${messageToSign}`);
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [address, messageToSign],
      });

      signatureLogin({
        variables: {
          address: address!,
          signature: signature
        }
      })
    }
    
  }

  const [getNonce, { loading: getNonceLoading }] = useMutation<getNonce, getNonceVariables>(GET_NONCE_MUTATION,
    { onCompleted: onGetNonceCompleted, onError })
  
  const onLogin = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const address = accounts[0];
        console.log(`address: ${address}`);

        console.log(`getNonce`)
        await getNonce({
          variables: {
            address
          }
        })
        console.log(`getNonce finished`)
      }    
    } else {
      console.log(`Metamask not installed`)
    }
  }

  return (
    <button
        onClick={onLogin}
        disabled={getNonceLoading || signatureLoginLoading}
        type="button"
        className="bg inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-pearl cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
    {
      getNonceLoading && 'Get Nonce...'
    }
    {
      signatureLoginLoading && 'Login...'
    }
    {
      (!getNonceLoading && !signatureLoginLoading) && 'Login with Metamask'
    }
    <MailIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  )
}