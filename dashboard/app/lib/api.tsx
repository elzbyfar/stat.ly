import { useUrlParams } from '../hooks/useUrlParams';

const headers = {
  'Content-Type': 'application/json',
};

export async function fetchMachineStates(params: { date: string }) {
  try {
    // const response = await fetch(useUrlParams('/machine-states', params), {
    //   method: 'GET',
    //   headers,
    // });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // const json = await response.json();
    // return json.data;
    const response = await fetch(
      useUrlParams('/search-player', { query: 'Nikola' }),
      {
        method: 'GET',
        headers,
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();
    console.log({ json });
    return json.data;
  } catch (error) {
    console.error('Error', error);
  }
}

export async function fetchMachines() {
  try {
    // const response = await fetch('/api/machines', {
    //   method: 'GET',
    //   headers,
    // });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // const json = await response.json();
    // return json.data;
    return [];
  } catch (error) {
    console.error('Error', error);
  }
}

export async function fetchPowerReadings(params: {
  keys: string[];
  date: string;
}) {
  try {
    // const response = await fetch(useUrlParams('/readings', params), {
    //   method: 'GET',
    //   headers,
    // });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // const json = await response.json();
    // return json.data;
    return [];
  } catch (error) {
    console.error('Error', error);
  }
}
