
import React from 'react';

const DomainInfo = () => {
  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-sage-800 mb-6">URLs Autorizadas</h1>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">URLs Principais (adicione ambas):</p>
              <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all mb-2">
                https://www.alemdoapego.com.br
              </code>
              <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                https://alemdoapego.com.br
              </code>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">URLs Importantes (com www):</p>
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

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">URLs Importantes (sem www):</p>
              <ul className="space-y-2">
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://alemdoapego.com.br/privacy-policy
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://alemdoapego.com.br/terms-of-service
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://alemdoapego.com.br/auth
                  </code>
                </li>
                <li>
                  <code className="block bg-white p-3 rounded border border-gray-200 text-lg select-all">
                    https://alemdoapego.com.br/documentation
                  </code>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Estas são as URLs que devem ser configuradas no Console do Google Cloud para a integração OAuth. 
                Recomenda-se adicionar tanto as versões com "www" quanto sem "www" para garantir que a autenticação 
                funcione em ambos os casos.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Importante: Certifique-se de que o site está publicado e acessível antes de prosseguir com a 
                verificação do Google.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainInfo;
