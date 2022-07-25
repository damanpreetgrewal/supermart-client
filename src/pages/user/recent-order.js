import React from 'react';
import { IoBagHandle } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import OrderServices from '@services/OrderServices';
import Loading from '@component/preloader/Loading';
import OrderHistory from '@component/order/OrderHistory';

const RecentOrder = () => {
  const { data, error, loading } = useAsync(OrderServices.getOrderByUser);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md font-serif">
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <h2 className="text-2xl text-center my-10 mx-auto w-11/12">
              {error}
            </h2>
          ) : data.length === 0 ? (
            <div className="text-center">
              <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                <IoBagHandle />
              </span>
              <h2 className="font-medium text-md my-4 text-gray-600">
                You Have no order Yet!
              </h2>
            </div>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-lg font-serif font-medium mb-5">
                Recent Order
              </h3>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                    <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="bg-gray-100">
                          <th
                            scope="col"
                            className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            OrderTime
                          </th>

                          <th
                            scope="col"
                            className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Method
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data?.map((order) => (
                          <tr key={order._id}>
                            <OrderHistory order={order} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
