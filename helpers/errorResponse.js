export default function errorResponse(res, error) {
  console.log(error, new Date());
  return res.status(400).json({ error });
}
