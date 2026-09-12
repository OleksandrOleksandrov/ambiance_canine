output "api_gateway_url" {
  description = "URL of the API Gateway"
  value       = aws_apigatewayv2_api.main.api_endpoint
}

output "cloudfront_url" {
  description = "URL of the CloudFront distribution"
  value       = "https://${aws_cloudfront_distribution.main.domain_name}"
}

output "s3_frontend_bucket" {
  description = "Name of the S3 bucket for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "s3_memory_bucket" {
  description = "Name of the S3 bucket for memory storage"
  value       = aws_s3_bucket.memory.id
}

output "lambda_function_name" {
  description = "Name of the API Lambda function"
  value       = aws_lambda_function.api.function_name
}

output "db_setup_lambda_function_name" {
  description = "Name of the database setup Lambda function"
  value       = aws_lambda_function.db_setup.function_name
}

output "custom_domain_url" {
  description = "Root URL of the production site"
  value       = var.use_custom_domain ? "https://${var.root_domain}" : ""
}

output "dynamodb_table_places" {
  description = "Name of the DynamoDB places table"
  value       = aws_dynamodb_table.places.name
}

output "dynamodb_table_groomers" {
  description = "Name of the DynamoDB groomers table"
  value       = aws_dynamodb_table.groomers.name
}

output "dynamodb_table_services" {
  description = "Name of the DynamoDB services table"
  value       = aws_dynamodb_table.services.name
}

output "dynamodb_table_gallery_photos" {
  description = "Name of the DynamoDB gallery photos table"
  value       = aws_dynamodb_table.gallery_photos.name
}

output "dynamodb_table_certificates" {
  description = "Name of the DynamoDB certificates table"
  value       = aws_dynamodb_table.certificates.name
}
