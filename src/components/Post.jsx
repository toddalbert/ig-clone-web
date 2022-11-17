import { Card, Avatar } from 'antd'

export default function Post({ post }) {
  return (
    <Card
      hoverable
      cover={
        <img alt={post.description} src={post.photo} />
      }
    >
      <Card.Meta
        avatar={<Avatar src={post.profilePic} />}
        title={post.username}
        description={post.description}
      />
    </Card>
  )
}
