export default function DisplayBox({texts} : {texts: String[]}) {
    return (
        <div className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
            {texts}
        </div>
    );
}