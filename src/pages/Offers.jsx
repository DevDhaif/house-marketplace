import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { motion } from 'framer-motion'
import ListingIte from '../components/ListingIte'
import { useTranslation } from 'react-i18next'


function Offers() {
    const {t} =  useTranslation();
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {

        const fetchListings = async () => {
            try {
                //get Ref
                const listingsRef = collection(db, 'listings')
                const q = query(listingsRef,
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'),
                    limit(1))

                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                const listings = []
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })


                setListings(listings)
                setLoading(false)
            }

            catch (error) {
                toast.error(`${error}`)
            }
        }

        fetchListings()
    }, [])

    const onFetchMore = async () => {
        try {
            //get Ref
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef,
                where('offer', '==', true),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(1))

            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible)

            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })


            setListings((prev) => [...prev, ...listings])
            setLoading(false)
        }

        catch (error) {
            toast.error("error")
        }
    }


    return (
        <div className='mx-4 my-4 mb-28 gap-y-12 '>
            <header className='mt-12 '>
                <p className='text-3xl font-semibold '>{t('offers')}</p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='mt-8 grid grid-cols-1 md:grid-cols-2 z-50 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

                            {listings.map((listing,i) => (
                                <motion.div
                                    className='z-50'
                                    key={listing.id}
                                    initial={{ opacity: 0, y:   200 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                >
                                    <ListingIte key={listing.id} listing={listing.data} id={listing.id} />
                                </motion.div>
                            ))}
                        </ul>
                    </main>
                    {lastFetchedListing && (
                            <p className='cursor-pointer text-center  mx-auto mt-4 px-4 py-0.5 bg-blue-500 w-28 rounded-md text-white'
                            onClick={onFetchMore}
                        >{t('loadMore')}</p>
                    )}
                </>
            )

                : (<h1>{t('noOffers')}</h1>)
            }
        </div>
    )
}

export default Offers