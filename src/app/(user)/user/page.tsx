'use client';
import { MdKeyboardArrowLeft } from "react-icons/md";
import UserCardWithForm from './_components/UserCardWithForm';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    return (
        <div>
            {/* Back icon header */}
            <div className='flex justify-center py-4 px-6 text-[#4A61E4]'>
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-lg font-bold focus:outline-none"
                >
                    <MdKeyboardArrowLeft  size={20} />
                    <span className="sr-only">Back</span>
                </button>
            </div>

            <UserCardWithForm />
        </div>
    );
};

export default Page;
