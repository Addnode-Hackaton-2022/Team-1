import { QueryClient, useQuery, UseQueryOptions } from 'react-query';
import { TBoat } from './boatArrayMock';
export const queryClient = new QueryClient();

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const useFetchAllBoats = (getOnlyOnce: boolean = false) => {
  const options: UseQueryOptions<TBoat[], Error> | undefined = getOnlyOnce
    ? {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        refetchInterval: false
      }
    : {
        refetchInterval: 500
      };

  return useQuery<TBoat[], Error>(
    'fetchAllboats',
    async () => {
      const data = await fetch(
        `https://ssrswebapi20220824153938.azurewebsites.net/Boat/All`,
        {
          headers
        }
      );
      const result = await data.json();
      return result;
    },
    options
  );
};

export const useFetchBoatsById = (ids: string) => {
  return useQuery<TBoat[], Error>(
    ['fetchAllBoatsById', ids],
    async () => {
      const data = await fetch(
        `https://ssrswebapi20220824153938.azurewebsites.net/Monitor?boatIds=${ids}`,
        {
          headers
        }
      );
      const result = await data.json();
      return result;
    },
    {
      refetchInterval: 1000
    }
  );
};

// "boatId": "string",
//   "attribute": {
//     "type": 0,
//     "value": "string",
//     "timestamp": "2022-08-24T19:47:01.546Z"
//   }
// }

export const setAttribute = async (
  boatId: string,
  value: string,
  type: number,
  timestamp: string
) => {
  const data = await fetch(
    'https://ssrswebapi20220824153938.azurewebsites.net/Monitor/setattribute',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ boatId, attribute: { type, value, timestamp } })
    }
  );
};
