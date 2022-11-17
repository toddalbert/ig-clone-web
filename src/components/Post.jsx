import { Card, Avatar } from 'antd'

export default function Post({ post }) {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img alt={post.description} src={post.photo} />
      }
    >
      <Card.Meta
        avatar={<Avatar src="https://randomuser.me/api/portraits/women/7.jpg" />}
        title={post.username}
        description={post.description}
      />
    </Card>
  )
}
