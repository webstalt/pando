export default function echo(req, res) {
  res.json(
    JSON.stringify({
      message: req.query.message ?? 'Base message',
    })
  )
}
