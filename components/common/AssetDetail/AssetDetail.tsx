import { Dialog, Transition } from '@headlessui/react';
import { gql, useQuery } from "@apollo/client";
import { XIcon } from '@heroicons/react/solid';
import { Fragment } from 'react'
import { Asset } from '../../../lib/types';
import { getAssetDetail, getAssetDetailVariables } from '../../../__generated__/getAssetDetail';
import Loading from '../Loading/Loading';

const GET_ASSET_DETAIL = gql`
  query getAssetDetail($assetContractAddress: String!, $tokenId: String!) {
    getAssetDetail(assetContractAddress: $assetContractAddress, tokenId: $tokenId) {
      ok
      error
      data {
        openseaId
        openseaName
        openseaAssetContract
        openseaTokenId
        openseaImageUrl
        openseaImageThumbnailUrl
        description
        traits {
          traitType
          value
        }
      }
    }
  }
`

type AssetDetailProps = {
  asset: Asset
  onClose: () => any
}

function AssetDetail({asset, onClose} : AssetDetailProps) {

  const { data, loading, error } = useQuery<getAssetDetail, getAssetDetailVariables>(GET_ASSET_DETAIL, {
    variables: { assetContractAddress: asset.openseaAssetContract, tokenId: asset.openseaTokenId }
  });

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block align-bottom bg-charcoal text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-charcoal rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <img src={asset.openseaImageUrl} />
                    </div>
                    <div>
                      <div className='text-sm font-extralight'>Name</div>
                      <div>
                        <div className='text-lg'>{asset.openseaName}</div>
                      </div>

                      { loading && <Loading /> }

                      { data && data.getAssetDetail && data.getAssetDetail.data && 
                        data.getAssetDetail.data.traits && 
                        <div className='grid grid-cols-2 gap-4'>
                          {data.getAssetDetail.data.traits.map(trait => (
                            <div key={trait.traitType} className='bg-tundora rounded p-2'>
                              <div className='text-alto text-xs font-extralight'>{trait.traitType}</div>
                              <div>{trait.value}</div>
                            </div>
                          ))}
                        </div> 
                      }
                    </div>
                  </div>
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AssetDetail;