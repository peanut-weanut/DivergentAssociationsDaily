import { useState } from "react";
import { sendWords } from '@/lib/api-client'

interface RequestProps {
  words : string[]
}
const SendRequestButton : React.FC<RequestProps> = ({ words }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [response, setResponse] = useState<string>('');

    const handleClick = async () => {
        setStatus('loading');

        try {
            const result = await sendWords.sendData(words);
            //console.log(testData)
            setResponse(result);
            setStatus('success');
        } catch (error){
            console.error(`ERROR: ${error}`);
            setStatus('error');
        }
        setTimeout(() => setStatus('idle'), 2000);
    }
    
    return (
        <div className="space-y-2">
          <button
            onClick={handleClick}
            disabled={status === 'loading'}
            className={`
              px-4 py-2 rounded transition-colors
              ${status === 'idle' ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}
              ${status === 'loading' ? 'bg-gray-400 text-white cursor-not-allowed' : ''}
              ${status === 'success' ? 'bg-green-500 text-white' : ''}
              ${status === 'error' ? 'bg-red-500 text-white' : ''}
            `}
          >
            {status === 'idle' && 'Send Test Packet'}
            {status === 'loading' && 'Sending...'}
            {status === 'success' && 'Sent!'}
            {status === 'error' && 'Error!'}
          </button>
    
          {response && (
            <div className="text-sm">
              Response: {response}
            </div>
          )}
        </div>
    );
};

export default SendRequestButton;