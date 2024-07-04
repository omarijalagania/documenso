/* eslint-disable @typescript-eslint/no-explicit-any */

export const userRegister = async (data: any) => {
  const phoneFormated =
    data.language === 'ka'
      ? `995${data.phone}`
      : data.language === 'en'
      ? `1${data.phone}`
      : data.phone;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register?first_name=${data.name}&last_name=${data.surName}&email=${data.email}&password=${data.password}&c_password=${data.repeatPassword}&phone=${phoneFormated}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw new Error('Failed to create task');
  }
};
