
import React from 'react';

const DomainInfo = () => {
  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-sage-800 mb-6">URLs Autorizadas</h1>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">URL Principal:</p>
              <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                https://www.alemdoapego.com.br
              </code>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">URLs Importantes:</p>
              <ul className="space-y-2">
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://www.alemdoapego.com.br/privacy-policy
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://www.alemdoapego.com.br/terms-of-service
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://www.alemdoapego.com.br/auth
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://www.alemdoapego.com.br/documentation
                  </code>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Estas são as URLs que devem ser configuradas no Console do Google Cloud para a integração OAuth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainInfo;
