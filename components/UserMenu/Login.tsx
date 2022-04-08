import { ApolloError, gql, useMutation } from '@apollo/client'
import { MailIcon } from '@heroicons/react/solid'
import MetaMaskOnboarding from '@metamask/onboarding';
import { getNonce, getNonceVariables } from '../../__generated__/getNonce';

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

export default function Login() {

  const onCompleted = async ({ getNonce }: getNonce) => {
    const { ok, error, messageToSign, address } = getNonce;
    if (ok) {
      console.log(`messageToSign: ${messageToSign}`);
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [address, messageToSign],
      });

      console.log(`signature: ${signature}`)
    }
    
  }

  const onError = (error: ApolloError) => console.log(`error: ${error}`);

  const [getNonce, { loading: getNonceLoading }] = useMutation<getNonce, getNonceVariables>(GET_NONCE_MUTATION,
    { onCompleted, onError })
  
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
        disabled={getNonceLoading}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
    Login with Metamask
    <MailIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  )
}