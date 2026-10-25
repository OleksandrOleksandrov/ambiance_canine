terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # AWS provider 6.69.0 breaks Lambda ZIP uploads with "bufio.Scanner: token too long".
      version = ">= 6.0, < 6.69.0"
    }
  }
}

provider "aws" {
  # Uses AWS CLI configuration (aws configure)
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
