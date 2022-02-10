import mock from '@/mocks/dashboard-mock';

export default function handler(req, res) {
  res.status(200).json(mock);
}